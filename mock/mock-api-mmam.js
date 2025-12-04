// Mock API for MMAM Demo
// This replaces backend API calls with browser-based storage

class MMAMockAPI {
  constructor() {
    this.initializeState();
  }

  initializeState() {
    // Try to load from localStorage
    const stored = localStorage.getItem('mmam-demo-state');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        this.state = data;
        console.log('[MockAPI] Loaded state from localStorage');
        return;
      } catch (e) {
        console.warn('[MockAPI] Failed to parse stored state:', e);
      }
    }

    // Initialize with sample data
    this.state = {
      flows: window.SAMPLE_FLOWS || [],
      users: window.SAMPLE_USERS || [],
      settings: {
        mqtt_enabled: false,
        mqtt_ws_url: '',
        flow_lock_role: 'editor'
      },
      currentUser: null,
      token: null
    };

    this.save();
    console.log('[MockAPI] Initialized with sample data');
  }

  save() {
    try {
      localStorage.setItem('mmam-demo-state', JSON.stringify(this.state));
    } catch (e) {
      console.error('[MockAPI] Failed to save state:', e);
    }
  }

  reset() {
    localStorage.removeItem('mmam-demo-state');
    this.initializeState();
    console.log('[MockAPI] Reset to sample data');
  }

  delay(ms = 100) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Authentication
  async login(username, password) {
    await this.delay(200);

    // For demo, accept any username/password
    let user = this.state.users.find(u => u.username === username);

    if (!user) {
      // Create a new viewer user
      user = {
        username: username,
        role: 'viewer',
        created_at: new Date().toISOString()
      };
      this.state.users.push(user);
    }

    this.state.currentUser = user;
    this.state.token = 'demo-token-' + Date.now();
    this.save();

    return {
      ok: true,
      json: async () => ({
        access_token: this.state.token,
        token_type: 'bearer'
      })
    };
  }

  async getMe() {
    await this.delay(50);
    if (!this.state.currentUser) {
      return { ok: false, status: 401 };
    }
    return {
      ok: true,
      json: async () => this.state.currentUser
    };
  }

  async getCurrentUser() {
    return this.state.currentUser;
  }

  // Flows API
  async getFlows(params = {}) {
    await this.delay(150);
    let result = [...this.state.flows];

    // Apply filters
    if (params.display_name) {
      const search = params.display_name.toLowerCase();
      result = result.filter(f =>
        (f.display_name && f.display_name.toLowerCase().includes(search))
      );
    }

    if (params.multicast_addr_a) {
      result = result.filter(f => f.multicast_addr_a && f.multicast_addr_a.includes(params.multicast_addr_a));
    }

    if (params.flow_status) {
      result = result.filter(f => f.flow_status === params.flow_status);
    }

    if (params.availability) {
      result = result.filter(f => f.availability === params.availability);
    }

    // Sorting
    const sortBy = params.sort_by || 'updated_at';
    const sortOrder = params.sort_order || 'desc';
    result.sort((a, b) => {
      const aVal = a[sortBy] || '';
      const bVal = b[sortBy] || '';
      const cmp = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      return sortOrder === 'desc' ? -cmp : cmp;
    });

    // Pagination
    const limit = parseInt(params.limit) || 20;
    const offset = parseInt(params.offset) || 0;
    result = result.slice(offset, offset + limit);

    return {
      ok: true,
      json: async () => result
    };
  }

  async getFlow(flowId) {
    await this.delay(100);
    const flow = this.state.flows.find(f => f.flow_id === flowId);
    if (!flow) {
      return { ok: false, status: 404, json: async () => ({ error: 'Flow not found' }) };
    }
    return {
      ok: true,
      json: async () => flow
    };
  }

  async createFlow(data) {
    await this.delay(200);

    const newFlow = {
      flow_id: this.generateUUID(),
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.state.flows.push(newFlow);
    this.save();

    return {
      ok: true,
      json: async () => newFlow
    };
  }

  async patchFlow(flowId, data) {
    await this.delay(200);

    const index = this.state.flows.findIndex(f => f.flow_id === flowId);
    if (index === -1) {
      return { ok: false, status: 404, json: async () => ({ error: 'Flow not found' }) };
    }

    // Merge the data
    this.state.flows[index] = {
      ...this.state.flows[index],
      ...data,
      updated_at: new Date().toISOString()
    };

    this.save();

    return {
      ok: true,
      json: async () => this.state.flows[index]
    };
  }

  async deleteFlow(flowId) {
    await this.delay(200);

    const index = this.state.flows.findIndex(f => f.flow_id === flowId);
    if (index === -1) {
      return { ok: false, status: 404, json: async () => ({ error: 'Flow not found' }) };
    }

    this.state.flows.splice(index, 1);
    this.save();

    return {
      ok: true,
      json: async () => ({ success: true })
    };
  }

  // Users API
  async getUsers() {
    await this.delay(150);
    return {
      ok: true,
      json: async () => [...this.state.users]
    };
  }

  async createUser(data) {
    await this.delay(200);

    const newUser = {
      username: data.username,
      role: data.role || 'viewer',
      created_at: new Date().toISOString()
    };

    this.state.users.push(newUser);
    this.save();

    return {
      ok: true,
      json: async () => newUser
    };
  }

  async updateUser(username, data) {
    await this.delay(200);

    const index = this.state.users.findIndex(u => u.username === username);
    if (index === -1) {
      return { ok: false, status: 404, json: async () => ({ error: 'User not found' }) };
    }

    this.state.users[index] = {
      ...this.state.users[index],
      ...data
    };

    this.save();

    return {
      ok: true,
      json: async () => this.state.users[index]
    };
  }

  async deleteUser(username) {
    await this.delay(200);

    const index = this.state.users.findIndex(u => u.username === username);
    if (index === -1) {
      return { ok: false, status: 404, json: async () => ({ error: 'User not found' }) };
    }

    this.state.users.splice(index, 1);
    this.save();

    return {
      ok: true,
      json: async () => ({ success: true })
    };
  }

  // Settings API
  async getSettings() {
    await this.delay(100);
    return {
      ok: true,
      json: async () => this.state.settings
    };
  }

  async updateSetting(key, value) {
    await this.delay(100);
    this.state.settings[key] = value;
    this.save();
    return {
      ok: true,
      json: async () => ({ [key]: value })
    };
  }

  // Dashboard / Statistics
  async getDashboardStats() {
    await this.delay(150);
    const total = this.state.flows.length;
    const active = this.state.flows.filter(f => f.flow_status === 'active').length;

    return {
      ok: true,
      json: async () => ({ total, active })
    };
  }

  // Checker APIs
  async checkCollisions() {
    await this.delay(300);

    const groups = {
      multicast_a: {},
      multicast_b: {}
    };

    this.state.flows.forEach(flow => {
      const keyA = `${flow.multicast_addr_a}:${flow.group_port_a}`;
      const keyB = `${flow.multicast_addr_b}:${flow.group_port_b}`;

      if (keyA) {
        if (!groups.multicast_a[keyA]) groups.multicast_a[keyA] = [];
        groups.multicast_a[keyA].push(flow);
      }

      if (keyB) {
        if (!groups.multicast_b[keyB]) groups.multicast_b[keyB] = [];
        groups.multicast_b[keyB].push(flow);
      }
    });

    const results = [];

    for (const [label, field, group] of [
      ['Multicast Address A + Port A', 'multicast_a', groups.multicast_a],
      ['Multicast Address B + Port B', 'multicast_b', groups.multicast_b]
    ]) {
      const entries = [];
      for (const [value, flows] of Object.entries(group)) {
        if (flows.length > 1) {
          entries.push({
            value,
            count: flows.length,
            flows: flows.map(f => ({
              flow_id: f.flow_id,
              display_name: f.display_name,
              nmos_node_label: f.nmos_node_label
            }))
          });
        }
      }
      results.push({ field, label, entries });
    }

    return {
      ok: true,
      json: async () => results
    };
  }

  async checkNMOS() {
    await this.delay(500);
    // Mock: return empty results
    return {
      ok: true,
      json: async () => ({
        checked: this.state.flows.length,
        skipped: 0,
        differences: [],
        errors: []
      })
    };
  }

  // NMOS APIs
  async discoverNMOSFlows(params) {
    await this.delay(500);
    // Mock: return empty flows list
    return {
      ok: true,
      json: async () => ({
        node: { id: 'demo-node', label: 'Demo Node' },
        flows: []
      })
    };
  }

  // Planner APIs
  async getPlannerDrives() {
    await this.delay(150);
    // Return sample drives for planner
    return {
      ok: true,
      json: async () => [
        {
          id: 1,
          start_ip: '239.0.0.0',
          end_ip: '239.255.255.255',
          description: 'Multicast Range 239.x.x.x',
          parent_id: null
        }
      ]
    };
  }

  async getPlannerFolders(driveId) {
    await this.delay(150);
    // Return empty folders for now (can be expanded later)
    return {
      ok: true,
      json: async () => []
    };
  }

  async getPlannerFiles(folderId) {
    await this.delay(150);
    // Return empty files/views for now
    return {
      ok: true,
      json: async () => []
    };
  }

  async getPlannerView(viewId) {
    await this.delay(200);
    // Mock view data - generate grid based on flows
    const cells = [];

    // Generate a grid of addresses based on existing flows
    this.state.flows.forEach(flow => {
      if (flow.multicast_addr_a) {
        cells.push({
          address: flow.multicast_addr_a,
          state: 'USED',
          flows: [flow]
        });
      }
      if (flow.multicast_addr_b) {
        cells.push({
          address: flow.multicast_addr_b,
          state: 'USED',
          flows: [flow]
        });
      }
    });

    return {
      ok: true,
      json: async () => ({
        cells: cells,
        view: {
          id: viewId,
          start_ip: '239.0.0.0',
          end_ip: '239.255.255.255'
        }
      })
    };
  }

  async createPlannerFolder(data) {
    await this.delay(200);
    return {
      ok: true,
      json: async () => ({
        id: Date.now(),
        ...data
      })
    };
  }

  async updatePlannerNode(nodeId, data) {
    await this.delay(200);
    return {
      ok: true,
      json: async () => ({ success: true })
    };
  }

  async deletePlannerNode(nodeId) {
    await this.delay(200);
    return {
      ok: true,
      json: async () => ({ success: true })
    };
  }

  // Utility
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

// Create global instance
if (typeof window !== 'undefined') {
  window.mockAPI = new MMAMockAPI();
  console.log('[MockAPI] MMAM Mock API initialized');
}
