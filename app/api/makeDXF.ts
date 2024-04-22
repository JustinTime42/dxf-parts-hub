'use server'
export const makeDXF = async <T>(dimensions: T, endpoint: string ) => {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dimensions),
    });
    const body = await response.text(); // or response.text() if the response is not JSON
    return {
        status: 200,
        body: body
    }
}
