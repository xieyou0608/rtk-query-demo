export const TableRow = ({ children, className }) => {
  return (
    <div className={`-my-px flex w-full divide-x border ${className}`}>
      {children}
    </div>
  );
};

export const TableHeaderRow = ({ children, className }) => {
  return (
    <TableRow className={`bg-yellow-200 font-bold ${className}`}>
      {children}
    </TableRow>
  );
};

export const TableCell = ({ children, className }) => {
  return (
    <div
      className={`flex items-center justify-center p-2 text-center ${className}`}
    >
      {children}
    </div>
  );
};

/**
 *
 * @param {{
 * variant: "text" | "circle" ;
 * }} props Props for the component
 *
 */
export const SkeletonContent = ({}) => {
  return <div></div>;
};
