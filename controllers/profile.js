const handleProfileGet = (req,res,db)=>{
	const {id}=req.params;

	db('users').select('*').from('users').where('id','=',id).
	then(user=> 
		{ 	
		if(user.length){
			res.json(user[0]) }
			else{
				res.status(400).json('error finding user')
			}
		}).catch( err => res.status(400).json('user not found'))

}
module.exports ={
	handleProfileGet :handleProfileGet
};