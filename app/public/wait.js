import { Spinner } from "@radix-ui/themes";

export function Hidable_spinner({waiting}) {
    return (
        waiting?
        <Spinner/>:null
    )
}