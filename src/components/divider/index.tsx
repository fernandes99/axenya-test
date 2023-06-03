import { Box } from "./styles"

export const Divider = (props: { orientation: "left" | "right" }) => {
    return (
        <Box orientation={props.orientation}>
            <div />
            <div />
            <div />
        </Box>
    )
}