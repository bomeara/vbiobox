var swimSpeed = 1.0;
var heightMax = 10.0;
var heightMin = 1.0;
var rangeSize = 10.0;
var rangeCenter:Transform;

private var turnTime = 0.0;
private var turnDirection = 0;
private var rise = 0.0;
private var speedVar = 0.0;

function Update ()
{
	// Sensing
	var forwardRay = transform.TransformDirection(Vector3.forward);
	var leftRay = transform.position;
	var rightRay = transform.position;
	var sideRay = transform.TransformDirection(Vector3.right);
	var downRay = transform.TransformDirection(Vector3.up);
	var dist  = Vector3.Distance(rangeCenter.position, transform.position) ;
	
	leftRay.x -= 2;
	rightRay.x += 2;
	
	// Movement
	
	if ( dist >= rangeSize)
	{
		var faceHome = Quaternion.LookRotation(rangeCenter.position - transform.position);
		transform.rotation = Quaternion.Slerp(transform.rotation, faceHome, Time.deltaTime * .5);
	}
	
	if (turnTime <= 0) //reset random movement
	{
		turnTime = Random.Range(1,3);
		turnDirection = Random.Range(-10,10);
		rise = Random.Range(-.5,.5);
		speedVar = Random.Range(0,1);
	}
	
	transform.position += transform.forward * swimSpeed  * Time.deltaTime;
	
	if (turnTime > 0)
	{
		transform.Rotate(0,turnDirection * Time.deltaTime,0);
		transform.Translate(Vector3(0, rise * Time.deltaTime,0));
		turnTime = turnTime - Time.deltaTime;
	}
	if (Physics.Raycast(transform.position, -downRay, heightMax))
	{
		if (Physics.Raycast(transform.position, -downRay, heightMin + Random.Range(0,2) * Time.deltaTime))
		{
			transform.Translate(Vector3(0, swimSpeed * Time.deltaTime,0));
		}
	}
	else
	{
		transform.Translate(Vector3(0, -swimSpeed * Time.deltaTime,0));
	}
	
	// Avoidance behavior
	if (Physics.Raycast(transform.position, forwardRay, 1))
	{
		transform.Rotate(0,2,0);
	}
	if (Physics.Raycast(transform.position, sideRay, .5))
	{
		transform.Rotate(0,-2,0);
	}
	if (Physics.Raycast(transform.position, -sideRay, .5))
	{
		transform.Rotate(0,2,0);
	}
	if (Physics.Raycast(leftRay, forwardRay, 1.1))
	{
		transform.Rotate(0,2,0);
	}
	if (Physics.Raycast(rightRay, forwardRay, 1.1))
	{
		transform.Rotate(0,-2,0);
	}
	if (transform.position.y < -.5) transform.Translate(Vector3(0, 1,0));
	
}