var speed = 0.05;
var rangeSize = 10.0;
var rangeCenter:Transform;
private var turnTime = 0.0;
private var turnDirection = 0;

function Update () {
	var dist  = Vector3.Distance(rangeCenter.position, transform.position) ;
	var fwd = transform.forward * speed;
	rigidbody.MovePosition(rigidbody.position + fwd * Time.deltaTime);
	
	if (turnTime <= 0) //reset random movement
	{
		turnTime = Random.Range(1,3);
		turnDirection = Random.Range(-10,10);
	}
	
	if (turnTime > 0)
	{
		transform.Rotate(0,turnDirection * Time.deltaTime,0);
		turnTime = turnTime - Time.deltaTime;
	}
	
	if ( dist >= rangeSize)
	{
		var faceHome = Quaternion.LookRotation(rangeCenter.position - transform.position);
		transform.rotation = Quaternion.Slerp(transform.rotation, faceHome, Time.deltaTime * .1);
	}
}