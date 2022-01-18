// 3001 portuna bir socket.io server açıyoruz
const io = require("socket.io")(3001, {
  cors: {
    // CORS takılmaması için
    origin: '*',
  }
});

// socket üzerindeki eventleri dinliyoruz
io.on('connection', function (socket) {
  console.log('Bağlantı sağlandı!');


  // bağlantı sağlayan kişiyi socket üzerine kayıt ediyoruz
  socket.on('saveMe', function (user) {
    socket.user = user;
    console.log('Kullanıcı Kayıt Edildi', user);

    socket.emit('saved', user);
  });

  socket.on('disconnect', function () {

    // kullanıcı çıkış yaptığında bunu handle ediyoruz
    console.log('Bağlantı koptu!', socket.user);
  });
});

// oluşturduğumuz middleware bir kısıta takılmadan devam ediyor. Aslında burada formaliteden bir middleware oluşturuldu.
export default function (req, res, next) {
  next()
}
