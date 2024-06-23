export const Conditional = ({ show, children }: { show: boolean; children: React.ReactNode }) => {
  if (show) return <>{children}</>;
  return <></>
}