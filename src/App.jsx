import { useState, useEffect } from 'react';
import Home       from './pages/Home';
import AllItems  from './pages/Allitems';
import About     from './pages/About';
import ItemDetail from './pages/Itemdetail'; 


export default function App() {
  const [page, setPage] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPage(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('//') && !href.startsWith('#')) {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setPage(href);
        window.scrollTo(0, 0);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (page === '/')          return <Home />;
  if (page === '/all-items') return <AllItems />;
  if (page === '/about')     return <About />;
  if (page.startsWith('/items/')) return <ItemDetail id={page.split('/')[2]} />; 


  return <Home />;
}