import { Spin } from "antd"
import React from "react"

const Loading = ({children, isPending, delay = 200}) => {
    return(
        <Spin spinning={isPending} delay={delay}>
            {children}
        </Spin>
    )
}
Loading.defaultProps = {
    isPending: false
}
export default Loading