# Pet Finder Coding Assignment

## Tech Stack

- **Frontend Framework**: Vite + React + TypeScript
- **State Management**: Redux Toolkit with Redux Persist for data persistence
- **API Integration**: RTK Query for data fetching and caching
- **Styling**: MUI component library

## Running Locally

To run this project locally, run the following commands in the terminal in this directory:

```bash
npm install
npm run dev
```

Can view in the browser at `http://localhost:5173`.

### Requirements

- Node.js 16.0 or higher
- npm 7.0 or higher

## Future Considerations

- Enhance responsive design for better mobile experience (particularly with the search filters).
- Further the location search functionality. Integrate with `/locations/search` endpoint to get the zipcodes associated to city & states provided by user.
- Develop authentication flow further to clear persisted cache on logout.
