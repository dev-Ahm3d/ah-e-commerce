const orderModel = require('../models/orders.model') ;

exports.getManageOrders = (req,res,next)=>{
    orderModel.getAllOrders().then(allOrders=>{
      res.render('manage-orders', {
          allOrders : allOrders , 
          isUser : req.session.userId ,
          isAdmin : req.session.isAdmin ,
          title : 'Admin | Manage-Orders'
      })  
    }).catch(err => res.redirect('/error')) ;
}


exports.editOrderSt  = (req,res,next)=>{
    orderModel.editOrderSt(req.body.orderId , req.body.st).then(()=>{
        res.redirect('/manage-orders')
    }).catch(err => res.redirect('/error')) ;

}