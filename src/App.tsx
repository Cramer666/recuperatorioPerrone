import AppRoutes from './routes/AppRoutes'
import APIContextProvider from './contexts/APIContextProvider';

const App: React.FC = () =>
  <APIContextProvider>
    <AppRoutes />
  </APIContextProvider>

export default App;