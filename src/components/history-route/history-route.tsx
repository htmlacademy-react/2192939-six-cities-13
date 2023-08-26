import { BrowserHistory } from 'history';
import { ReactNode, useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';

type HistoryRouterProps = {
  history: BrowserHistory;
  basename?: string;
  children?: ReactNode;
}

export default function HistoryRouter({
  basename, children, history
}: HistoryRouterProps) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}
