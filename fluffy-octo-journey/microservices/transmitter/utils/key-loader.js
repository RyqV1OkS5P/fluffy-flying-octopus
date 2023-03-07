import  { XMLParser} from "fast-xml-parser";
import fs from "fs";


async function loadFile(path) {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
}   }

async function parseXML(data) {
    const parser = new XMLParser();
    return parser.parse(data)
}

async function loadKeys(path) {
    let data = await loadFile(path)
    return JSON.parse(data)
}

export { loadKeys }
