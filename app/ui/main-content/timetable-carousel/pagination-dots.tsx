import { useDarkMode } from "../../context/dark-mode-context"

interface PaginationDotsProps {
    numberOfPages: number;
    currPage: number;
}

export default function PaginationDots(props: PaginationDotsProps) {

    const { darkMode } = useDarkMode()

    const paginationDotStyle = {
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        border: `1px solid ${darkMode ? "#DAD6CE" : "black"}`,
        marginRight: "10px"
    }

    const activeStyle = {
        backgroundColor: darkMode ? "#DAD6CE" : "black",
        border: "none"
    }

    return (
        <>

            <div className="centerR" style={{ margin: "20px" }}>
                {
                    Array(props.numberOfPages).fill(0).map((_, index) => {
                        return (
                            <div key={index}
                                // Style add paginationDotStyle and if active, add a activeStyle
                                style={props.currPage === index + 1 ? { ...paginationDotStyle, ...activeStyle } : paginationDotStyle}>

                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}