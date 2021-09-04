export function preventDefault<T extends (e: any) => void>(fn: T) {
  return <E extends React.SyntheticEvent>(e: E) => {
    e.preventDefault();
    fn(e);
  };
}
