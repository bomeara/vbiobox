var period = 8.0;
var myTimer : float = period;

function Awake ()
{
	transform.GetComponent(Cloth).externalAcceleration.x = .5;
}

function Update () 
{

	myTimer -= Time.deltaTime;
	
	if (myTimer >= period / 2)
	{
		transform.GetComponent(Cloth).externalAcceleration.x = .1;
	}
	else
	{
		transform.GetComponent(Cloth).externalAcceleration.x = -.1;
	}
	
	if (myTimer <= 0)
	{
		myTimer = period;
	}

	
}