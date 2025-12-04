// Mock API Layer for MMAM Demo
// Replaces all backend API calls with client-side operations

class MockAPI {
  constructor() {
    this.initializeData();
    this.mockToken = 'demo-token-' + Date.now();
  }

  // Initialize data from sample or localStorage
  initializeData() {
    const stored = localStorage.getItem('mmam-mock-data');
    if (stored) {
      const data = JSON.parse(stored);
      this.flows = data.flows;
      this.users = data.users;
      this.currentUser = data.currentUser;
    } else {
      this.flows = JSON.parse(JSON.stringify(SAMPLE_FLOWS));
      this.users = JSON.parse(JSON.stringify(SAMPLE_USERS));
      this.currentUser = null;
      this.saveData();
    }
  }

  // Save data to localStorage
  saveData() {
    localStorage.setItem('mmam-mock-data', JSON.stringify({
      flows: this.flows,
      users: this.users,
      currentUser: this.currentUser
    }));
  }

  // Reset to sample data
  reset() {
    this.flows = JSON.parse(JSON.stringify(SAMPLE_FLOWS));
    this.users = JSON.parse(JSON.stringify(SAMPLE_USERS));
    this.currentUser = null;
    this.saveData();
  }

  // Simulate network delay
  async delay(ms = 100) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Authentication
  async login(username, password) {
    await this.delay(200);
    // Accept any username/password for demo
    const user = this.users.find(u => u.username === username) || {
      id: 999,
      username: username,
      role: 'viewer',
      created_at: new Date().toISOString()
    };

    this.currentUser = user;
    this.saveData();

    return {
      access_token: this.mockToken,
      token_type: 'bearer',
      user: user
    };
  }

  async logout() {
    await this.delay(100);
    this.currentUser = null;
    this.saveData();
    return { success: true };
  }

  async getCurrentUser() {
    await this.delay(50);
    return this.currentUser;
  }

  // Flows API
  async getFlows(params = {}) {
    await this.delay(150);
    let result = [...this.flows];

    // Filter by search
    if (params.search) {
      const search = params.search.toLowerCase();
      result = result.filter(f =>
        f.label.toLowerCase().includes(search) ||
        f.multicast_ip.includes(search) ||
        f.source_ip.includes(search) ||
        (f.alias_1 && f.alias_1.toLowerCase().includes(search)) ||
        (f.alias_2 && f.alias_2.toLowerCase().includes(search))
      );
    }

    // Filter by flow_type
    if (params.flow_type) {
      result = result.filter(f => f.flow_type === params.flow_type);
    }

    // Sort
    if (params.sort) {
      const [field, order] = params.sort.split(':');
      result.sort((a, b) => {
        const aVal = a[field] || '';
        const bVal = b[field] || '';
        const cmp = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        return order === 'desc' ? -cmp : cmp;
      });
    }

    return result;
  }

  async getFlow(id) {
    await this.delay(100);
    const flow = this.flows.find(f => f.id === parseInt(id));
    if (!flow) throw new Error('Flow not found');
    return flow;
  }

  async createFlow(data) {
    await this.delay(200);
    const newFlow = {
      id: Math.max(...this.flows.map(f => f.id)) + 1,
      flow_id: this.generateUUID(),
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.flows.push(newFlow);
    this.saveData();
    return newFlow;
  }

  async updateFlow(id, data) {
    await this.delay(200);
    const index = this.flows.findIndex(f => f.id === parseInt(id));
    if (index === -1) throw new Error('Flow not found');

    this.flows[index] = {
      ...this.flows[index],
      ...data,
      updated_at: new Date().toISOString()
    };
    this.saveData();
    return this.flows[index];
  }

  async patchFlow(id, data) {
    await this.delay(200);
    const index = this.flows.findIndex(f => f.id === parseInt(id));
    if (index === -1) throw new Error('Flow not found');

    // Partial update
    Object.keys(data).forEach(key => {
      this.flows[index][key] = data[key];
    });
    this.flows[index].updated_at = new Date().toISOString();

    this.saveData();
    return this.flows[index];
  }

  async deleteFlow(id) {
    await this.delay(200);
    const index = this.flows.findIndex(f => f.id === parseInt(id));
    if (index === -1) throw new Error('Flow not found');

    this.flows.splice(index, 1);
    this.saveData();
    return { success: true };
  }

  // Users API
  async getUsers() {
    await this.delay(150);
    return [...this.users];
  }

  async createUser(data) {
    await this.delay(200);
    const newUser = {
      id: Math.max(...this.users.map(u => u.id)) + 1,
      ...data,
      created_at: new Date().toISOString()
    };
    this.users.push(newUser);
    this.saveData();
    return newUser;
  }

  async updateUser(id, data) {
    await this.delay(200);
    const index = this.users.findIndex(u => u.id === parseInt(id));
    if (index === -1) throw new Error('User not found');

    this.users[index] = {
      ...this.users[index],
      ...data
    };
    this.saveData();
    return this.users[index];
  }

  async deleteUser(id) {
    await this.delay(200);
    const index = this.users.findIndex(u => u.id === parseInt(id));
    if (index === -1) throw new Error('User not found');

    this.users.splice(index, 1);
    this.saveData();
    return { success: true };
  }

  // Checker - Collision detection
  async checkCollisions() {
    await this.delay(300);
    const collisions = [];
    const seen = new Map();

    this.flows.forEach(flow => {
      const key = `${flow.multicast_ip}:${flow.port}`;
      if (seen.has(key)) {
        collisions.push({
          key: key,
          flows: [seen.get(key), flow]
        });
      } else {
        seen.set(key, flow);
      }
    });

    return collisions;
  }

  // Planner - Bandwidth calculation
  async calculateBandwidth(flowIds) {
    await this.delay(200);
    const selectedFlows = this.flows.filter(f => flowIds.includes(f.id));
    const totalBandwidth = selectedFlows.reduce((sum, f) => sum + (f.bandwidth_mbps || 0), 0);

    return {
      total_mbps: totalBandwidth,
      flows: selectedFlows.map(f => ({
        id: f.id,
        label: f.label,
        bandwidth_mbps: f.bandwidth_mbps
      }))
    };
  }

  // NMOS Discovery Mock
  async discoverNMOSFlows() {
    await this.delay(500);
    // Return subset of flows as "discovered" NMOS flows
    return this.flows.slice(0, 15).map(f => ({
      ...f,
      nmos_id: f.flow_id,
      discovered: true,
      source: 'NMOS Registry'
    }));
  }

  // Settings API
  async getSettings() {
    await this.delay(100);
    const settings = localStorage.getItem('mmam-mock-settings');
    return settings ? JSON.parse(settings) : {
      theme: 'light',
      notifications: true,
      auto_refresh: false
    };
  }

  async updateSettings(data) {
    await this.delay(100);
    localStorage.setItem('mmam-mock-settings', JSON.stringify(data));
    return data;
  }

  // Dashboard stats
  async getDashboardStats() {
    await this.delay(150);
    const videoFlows = this.flows.filter(f => f.flow_type === 'video').length;
    const audioFlows = this.flows.filter(f => f.flow_type === 'audio').length;
    const ancillaryFlows = this.flows.filter(f => f.flow_type === 'ancillary').length;
    const totalBandwidth = this.flows.reduce((sum, f) => sum + (f.bandwidth_mbps || 0), 0);
    const activeFlows = this.flows.filter(f =>
      f.user_field_1 && f.user_field_1.toLowerCase().includes('active')
    ).length;

    return {
      total_flows: this.flows.length,
      video_flows: videoFlows,
      audio_flows: audioFlows,
      ancillary_flows: ancillaryFlows,
      total_bandwidth_mbps: totalBandwidth.toFixed(2),
      active_flows: activeFlows
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

// Global mock API instance
window.mockAPI = new MockAPI();
