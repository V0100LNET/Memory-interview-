export interface DataAnimals {
    entries: Entry[];
}

export interface Entry {
    meta:   EntryMeta;
    fields: Fields;
}

export interface EntryMeta {
    name:              string;
    slug:              string;
    tags:              any[];
    uuid:              string;
    excerpt:           string;
    private:           boolean;
    category:          null;
    segments:          any[];
    created_at:        Date;
    updated_at:        Date;
    published_at:      Date;
    unpublish_at:      null;
    category_name:     null;
    category_slug:     null;
    space:             string;
}


export interface Fields {
    image: Image;
}

export interface Image {
    url:          string;
    tags:         any[];
    uuid:         string;
    title:        string;
    alt_text:     null;
    description:  null;
}

export interface RevealedCards {
    cardId: string
    cardIndex: number
}