export function stopPropagation<T extends (e: any) => void>(fn: T) {
  return <E extends React.SyntheticEvent>(e: E) => {
    e.stopPropagation();
    fn(e);
  };
}
