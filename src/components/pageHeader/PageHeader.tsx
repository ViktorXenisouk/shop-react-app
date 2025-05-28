import './PageHeader.css'

const PageHeader = ({ children }: { children: string }) => {

    return (
        <div className='page-header--container'>
            <h1 className='page-header--text'>{children}</h1>
        </div>
    )
}

export { PageHeader }