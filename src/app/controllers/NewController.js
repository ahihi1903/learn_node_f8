class NewController {
  
    //get /new
    index(req,res){
        res.render('new');
    }

    //get /new/:slug
    show(req, res) {
        res.send('NEWS DETAIL!!! ')
    }


}

module.exports = new NewController;