# MMAM Mock Frontend for GitHub Pages

This directory contains a fully functional mock version of the MMAM (Media Multicast Address Manager) frontend that runs entirely in the browser without requiring a backend server.

## Files

### Core Files
- `index.html` - Main application interface (copied from `/home/moipuser/mmam-docker/frontend/index.html`)
- `main.js` - Application logic (copied from `/home/moipuser/mmam-docker/frontend/main.js`)
- `favicon.svg` - Application icon

### Mock API Layer
- `sample-data-mmam.js` - Sample ST2110 flow data matching MMAM structure
- `mock-api-mmam.js` - Mock API implementation that mimics the MMAM backend
- `fetch-interceptor.js` - Intercepts fetch() calls and redirects them to mock API

### Vendor Dependencies
- `vendor/vue.global.prod.js` - Vue.js framework
- `vendor/tailwind-cdn.js` - Tailwind CSS
- `vendor/inter-font.css` - Inter font
- `vendor/mqtt.min.js` - MQTT client (for realtime features)

## Modifications from Original

### 1. Added Scripts (in `<head>`)
```html
<script src="sample-data-mmam.js"></script>
<script src="mock-api-mmam.js"></script>
<script src="fetch-interceptor.js"></script>
```

### 2. Added Demo Banner
A blue banner at the top of the main content area indicates demo mode and provides a "Reset Data" button.

### 3. Fetch Interception
All `fetch('/api/...')` calls are intercepted by `fetch-interceptor.js` and routed to the mock API instead of making real HTTP requests.

## Features

- **Browser-based Storage**: All data is stored in `localStorage`, persisting across page reloads
- **Sample Data**: Includes 12 realistic ST2110 flows with proper MMAM structure
- **Full CRUD Operations**: Create, read, update, and delete flows
- **User Management**: Manage users with different roles (admin, editor, viewer)
- **Search & Filter**: Search flows by various criteria
- **Settings**: Application settings are stored locally
- **Collision Detection**: Mock collision checking on multicast addresses
- **Reset Function**: Clear all data and restore sample data

## Data Structure

Flows include all MMAM fields:
- Basic info: `display_name`, `flow_id`, `data_source`, `note`
- ST2022-7 paths: `source_addr_a/b`, `multicast_addr_a/b`, ports
- NMOS metadata: node info, device IDs, versions
- Media info: `media_type`, `st2110_format`, `redundancy_group`
- Status: `flow_status`, `availability`
- Aliases (8 fields) and user fields (8 fields)

## Usage

1. Open `index.html` in a modern web browser
2. Login with any username/password (demo mode accepts all credentials)
3. Explore the flows, create new ones, edit existing ones
4. Click "Reset Data" in the demo banner to restore sample data

## Limitations

- No real NMOS discovery (returns empty results)
- No real-time MQTT updates
- No backend persistence (data only in browser localStorage)
- Some advanced features may return mock/empty responses
- NMOS check/sync features are stubs

## Deployment to GitHub Pages

Simply push this directory to GitHub and enable GitHub Pages for the repository. The site will work immediately without any backend configuration.

---

Generated: 2025-12-04
Original source: `/home/moipuser/mmam-docker/frontend/`
