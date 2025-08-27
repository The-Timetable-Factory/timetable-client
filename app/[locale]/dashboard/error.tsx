'use client'

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    return (
        <div>
            <h1>Oops! An error occurred</h1>
            <pre>{error.message}</pre>
            <button onClick={reset}>Try again</button>
        </div>
    )
}
