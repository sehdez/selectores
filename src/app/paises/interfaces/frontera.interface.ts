export interface Frontera {
    name:    Name;
    borders: string[];
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: NativeName;
}

export interface NativeName {
    spa: SPA;
}

export interface SPA {
    official: string;
    common:   string;
}
