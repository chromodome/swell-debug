import DefaultErrorPage from 'next/error'

export default function Page404() {
    return <DefaultErrorPage statusCode={404} />;
}
