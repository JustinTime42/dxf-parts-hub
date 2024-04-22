'use server'

export const makeDXF = async <T>(dimensions: T, endpoint: string ) => {
    console.log(dimensions)
    const body = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dimensions),
    });
    console.log('body', body)
    return {
        status: 200,
        body: body
    }
}