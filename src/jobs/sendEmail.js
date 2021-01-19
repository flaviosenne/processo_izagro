const Email = require('../helpers/email')

const path = require('path')

const htmlToText = require('nodemailer-html-to-text').htmlToText

Email.use('compile', htmlToText({
    viewEngine: 'html-to-text',
    viewPath: path.resolve(__dirname+ '/views/'),
    extName: '.html'
}))

module.exports = {
    key: 'sendEmail',
    async handle({ data }) {

        const { name, email } = data
        await Email.sendMail({
            from: `joao dev <${process.env.MAIL_USER}>`,
            to: `${name} <${email}>`,
            subject: 'Mandar e-mail para processo da izagro',
            text: ' Essa é uma menssagem estilizada',
            attachments: [
                {
                    filename: 'emoji.jpg',
                    path: `${path.join(__dirname, '../', 'img/')}emoji.jpg`,
                    cid: 'emoji'
                }
            ],
            
            html: `
            <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
    <style>
        .container{
            width: 80%;
            margin: 0 auto;
            font-weigth: 300;
            font-size: 14pt;
            border: solid 1px black;
            border-radius: 6px;
            min-height: 200px;
            display: flex;
            justify-content: space-around;
            font-family: sans-serif

        }
        .card{
            width: 50%;
            padding: 10px;
            margin: 10px;
        }

        .btn{
            border: solid;
            background: green;
            padding: 10px;
            margin: 10px;
            color: balck

        }
        .btn:hover{
            background: gray;
        }
        a{
            text-decoration: none;
            color: black;
        }
        .img{
            width: 50px;
        }

    </style>

    <div class='container'> 
    
        <div>
            <div class="card">
            
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="https://google.com.br" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        
        </div>
    
        <div>
        <img class="img" src="cid:emoji" />
        </div>
    
    </div>   

</body>

</html>
            `

        }, (err, info) => {
            console.log(err)
            console.log(info)
        })
    }
}

