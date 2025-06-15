const get = (name: string) => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

const set = (name: string, value: string, options = {} as any) => {
    options = {
        path: '/',
        expires: new Date(Date.now() + 86400e3),
        ...options
    };

    if (options.expires instanceof Date) options.expires = options.expires.toUTCString();

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

const remove = (name: string) => set(name, "", {'max-age': -1})

const Cookie={get,set,remove}

export default Cookie