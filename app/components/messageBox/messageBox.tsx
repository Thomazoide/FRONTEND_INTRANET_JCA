import type { ReactElement } from "react";

export default function MessageBox(props: {message: string, error: boolean}): ReactElement {
    return (
        <div className={`h-fit w-fit rounded-xl shadow-xl border-1 border-white p-10 bg-gradient-to-b ${!props.error ? "from-green-700 via-green-600 to-green-500" : "from-red-700 via-red-600 to-red-500"} text-white text-center`}>
            <p>
                {props.message}
            </p>
        </div>
    )
}