module.exports.upload_file = (req)=>{
    let file = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
    console.log(file);
    return file;
}