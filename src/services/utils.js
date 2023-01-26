export default async function getData(url) {
    try{
        const data = await fetch(url);
        const res = await data.json();
        return res;
    }catch(err){
        console.error(err);
    }
};