
//////grid displaying component
export const GridComponent = ({ col, gap, children }) => {
  return <div className={`grid ${col} gap-${gap} mobile:grid-cols-1 md:grid-cols-1`}>{children}</div>;
}

////card dispalying component
export const CardComponent=({children})=>{
    return <div className=" shadow-xl"> {children}</div>
}
