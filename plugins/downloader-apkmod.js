let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
if (!args[0]) throw '[ ✰ ] Ingresa el nombre de la aplicación que deseas descargar junto al comando.\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* WhatsApp`, m, rcanal)
let res = await fetch(`https://api.dorratz.com/v2/apk-dl?text=${args[0]}`);
let result = await res.json();
let { name, size, lastUpdate, icon } = result;
let URL = result.dllink
let packe = result.package
let texto = `*乂  A P T O I D E  -  D O W N L O A D*\n\n`
    txt += `	✩   *Nombre* : ${name}\n`
    txt += `	✩   *Version* : ${version}\n`
    txt += `	✩   *Descargas* : ${amount_downloads}\n`
    txt += `	✩   *Peso* :  ${size}\n\n`
    txt += `*- ↻ El archivo se esta enviando espera un momento, soy lenta. . .*`
await conn.sendFile(m.chat, icon, name + '.jpg', texto, m, rcanal)

await conn.sendMessage(m.chat, { document: { url: URL }, mimetype: 'application/vnd.android.package-archive', fileName: name + '.apk', caption: ''}, { quoted: m });
}
handler.tags = ['downloader']
handler.help = ['apkmod']
handler.command = /^(apkmod|apk|dapk2|aptoide|aptoidedl)$/i
handler.register = true
handler.zenis = 10

export default handler
