

export default function weightDisplays() {

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6">
                {/* Content goes here */}
                {/* We use less vertical padding on card headers on desktop than on body sections */}
                <p>Goal Weight</p>
            </div>
            <div className="px-4 py-5 sm:p-6">
                {/* Content goes here */}
                <p>Current Weight</p>
            </div>
            <div className="px-4 py-4 sm:px-6">
                {/* Content goes here */}
                {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
                <p>...To go</p>
            </div>
        </div>
    )
}