export function convertToSerializableObject(leanDocument) {
    if (!leanDocument || typeof leanDocument !== "object") {
        throw new Error("Invalid document provided for serialization");
    }

    for (const key of Object.keys(leanDocument)) {
        if (leanDocument[key]?.toJSON && leanDocument[key]?.toString) {
            leanDocument[key] = leanDocument[key].toString();
        }
    }
    return leanDocument;
}
