let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
if (!args[0]) throw `\`\`\`[ ✰ ] Ingresa el nombre de la aplicación que deseas descargar junto al comando. » Ejemplo:\n${usedPrefix + command} WhatsApp\`\`\``
let res = await fetch(`https://api.dorratz.com/v2/apk-dl?text=${args[0]}`);
let result = await res.json();
let { name, size, lastUpdate, icon } = result;
let URL = result.dllink
let packe = result.package
let texto = `  *乂  A P K  -  D O W N L O A D*
    ✩   *Nombre* : ${name}
    ✩   *Tamaño* : ${size}
    ✩   *Package* : ${packe}
    ✩   *Actualizado* : ${lastUpdate}
    
*- ↻ El archivo se esta enviando espera un momento, soy lenta. . .*`
await conn.sendFile(m.chat, icon, name + '.jpg', texto, m)

await conn.sendMessage(m.chat, { document: { url: URL }, mimetype: 'application/vnd.android.package-archive', fileName: name + '.apk', caption: ''}, { quoted: m });
}
handler.tags = ['downloader']
handler.help = ['apkmod']
handler.command = /^(apkmod|apk|dapk2|aptoide|aptoidedl)$/i
handler.register = true
handler.zenis = 10

export default handler
