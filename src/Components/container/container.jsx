const Container = ({children,height,width,color})=> {
    return(
        <div id='cont' style={{height:height, width:width, backgroundColor:color}}>
        {children}
        </div>
    )
}

export default Container