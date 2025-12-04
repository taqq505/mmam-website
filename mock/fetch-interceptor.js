// Fetch Interceptor for MMAM Mock
// Wraps the native fetch to redirect API calls to mockAPI

(function() {
  const originalFetch = window.fetch;
  
  window.fetch = async function(url, options = {}) {
    // Parse the URL
    const urlStr = typeof url === 'string' ? url : url.toString();
    
    // Check if this is an API call we should mock
    if (urlStr.includes('/api/')) {
      console.log('[Mock] Intercepting:', urlStr, options);
      
      // Extract the endpoint
      const match = urlStr.match(/\/api\/(.+?)(?:\?|$)/);
      if (!match) return originalFetch.call(this, url, options);
      
      const endpoint = match[1];
      const method = (options.method || 'GET').toUpperCase();
      const headers = options.headers || {};
      const body = options.body ? JSON.parse(options.body) : null;
      
      // Parse query parameters
      const urlObj = new URL(urlStr, window.location.origin);
      const params = Object.fromEntries(urlObj.searchParams);
      
      try {
        let result;
        
        // Route to appropriate mockAPI method
        if (endpoint === 'login' && method === 'POST') {
          result = await window.mockAPI.login(body.username, body.password);
        } else if (endpoint === 'me' && method === 'GET') {
          result = await window.mockAPI.getCurrentUser();
        } else if (endpoint.startsWith('flows')) {
          const parts = endpoint.split('/');
          if (parts.length === 1 && method === 'GET') {
            return await window.mockAPI.getFlows(params);
          } else if (parts.length === 1 && method === 'POST') {
            return await window.mockAPI.createFlow(body);
          } else if (parts.length === 2 && method === 'GET') {
            return await window.mockAPI.getFlow(parts[1]);
          } else if (parts.length === 2 && method === 'PATCH') {
            return await window.mockAPI.patchFlow(parts[1], body);
          } else if (parts.length === 2 && method === 'DELETE') {
            return await window.mockAPI.deleteFlow(parts[1]);
          } else if (parts[1] === 'summary') {
            return await window.mockAPI.getDashboardStats();
          }
        } else if (endpoint.startsWith('users')) {
          const parts = endpoint.split('/');
          if (parts.length === 1 && method === 'GET') {
            return await window.mockAPI.getUsers();
          } else if (parts.length === 1 && method === 'POST') {
            return await window.mockAPI.createUser(body);
          } else if (parts.length === 2 && method === 'PATCH') {
            return await window.mockAPI.updateUser(parts[1], body);
          } else if (parts.length === 2 && method === 'DELETE') {
            return await window.mockAPI.deleteUser(parts[1]);
          }
        } else if (endpoint === 'settings' && method === 'GET') {
          return await window.mockAPI.getSettings();
        } else if (endpoint.startsWith('settings/') && method === 'PATCH') {
          const key = endpoint.split('/')[1];
          return await window.mockAPI.updateSettings({ [key]: body.value });
        } else if (endpoint === 'checker/collisions' && method === 'POST') {
          return await window.mockAPI.checkCollisions();
        } else if (endpoint === 'nmos/discover' && method === 'POST') {
          return await window.mockAPI.discoverNMOSFlows();
        } else if (endpoint === 'dashboard/stats') {
          return await window.mockAPI.getDashboardStats();
        } else if (endpoint.startsWith('address')) {
          const parts = endpoint.split('/');
          // /api/address/buckets/privileged
          if (endpoint === 'address/buckets/privileged' && method === 'GET') {
            const response = await window.mockAPI.getPlannerDrives();
            return response;
          }
          // /api/address/buckets/{id}/children
          else if (parts[1] === 'buckets' && parts[3] === 'children' && method === 'GET') {
            const folderId = parts[2];
            const response = await window.mockAPI.getPlannerFolders(folderId);
            return response;
          }
          // /api/address/buckets/export
          else if (endpoint === 'address/buckets/export' && method === 'GET') {
            return {
              ok: true,
              json: async () => ({ buckets: [] })
            };
          }
          // /api/address/buckets/import
          else if (endpoint === 'address/buckets/import' && method === 'POST') {
            return {
              ok: true,
              json: async () => ({ success: true })
            };
          }
          // /api/address/buckets/parent
          else if (endpoint === 'address/buckets/parent' && method === 'POST') {
            const response = await window.mockAPI.createPlannerFolder(body);
            return response;
          }
          // /api/address-map
          else if (endpoint.startsWith('address-map')) {
            const response = await window.mockAPI.getPlannerView(params.parent_id || '1');
            return response;
          } else {
            console.warn('[Mock] Unimplemented address endpoint:', endpoint, method);
            result = { success: true };
          }
        } else if (endpoint.startsWith('planner/')) {
          const parts = endpoint.split('/');
          if (parts[1] === 'drives' && method === 'GET') {
            const response = await window.mockAPI.getPlannerDrives();
            return response;
          } else if (parts[1] === 'folders' && method === 'GET') {
            const driveId = params.drive_id || params.parent_id;
            const response = await window.mockAPI.getPlannerFolders(driveId);
            return response;
          } else if (parts[1] === 'files' && method === 'GET') {
            const folderId = params.parent_id;
            const response = await window.mockAPI.getPlannerFiles(folderId);
            return response;
          } else if (parts[1] === 'view' && parts.length === 3 && method === 'GET') {
            const response = await window.mockAPI.getPlannerView(parts[2]);
            return response;
          } else if (parts[1] === 'folder' && method === 'POST') {
            const response = await window.mockAPI.createPlannerFolder(body);
            return response;
          } else if (parts[1] === 'node' && parts.length === 3 && method === 'PATCH') {
            const response = await window.mockAPI.updatePlannerNode(parts[2], body);
            return response;
          } else if (parts[1] === 'node' && parts.length === 3 && method === 'DELETE') {
            const response = await window.mockAPI.deletePlannerNode(parts[2]);
            return response;
          } else {
            console.warn('[Mock] Unimplemented planner endpoint:', endpoint, method);
            result = { success: true, message: 'Mock: planner endpoint not implemented' };
          }
        } else {
          // Return empty success for unimplemented endpoints
          console.warn('[Mock] Unimplemented endpoint:', endpoint, method);
          result = { success: true, message: 'Mock: endpoint not implemented' };
        }
        
        // Return a Response-like object
        return {
          ok: true,
          status: 200,
          json: async () => result,
          text: async () => JSON.stringify(result),
          headers: new Headers({}),
          statusText: 'OK'
        };
        
      } catch (error) {
        console.error('[Mock] Error:', error);
        return {
          ok: false,
          status: 500,
          json: async () => ({ error: error.message }),
          text: async () => JSON.stringify({ error: error.message }),
          headers: new Headers({}),
          statusText: 'Internal Server Error'
        };
      }
    }
    
    // Not an API call, use original fetch
    return originalFetch.call(this, url, options);
  };
  
  console.log('[Mock] Fetch interceptor installed');
})();
