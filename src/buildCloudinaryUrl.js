const buildCloudinaryUrl = (args) => {
	let url = ''
	url+= 'https://res.cloudinary.com/jackywinter/'
	url+= args?.resource_type + '/'
	url+= args?.type + '/'
	url+= 'c_thumb,w_300,h_300,q_50'
	url+= '/'
	url+= args?.public_id + '.jpg'
	return url
} 

export default buildCloudinaryUrl