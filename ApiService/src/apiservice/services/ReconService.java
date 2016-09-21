package apiservice.services;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import apiservices.auths.Secured;

@Path("/ReconService")
public class ReconService {
	
	@GET
	@Secured
	@Produces(MediaType.APPLICATION_JSON)
	public Response get() {
		DateFormat df = new SimpleDateFormat("dd-MM-yyy HH:mm:ss");
		String result = "{\"Test\": \"" + df.format(new Date()) + "\"}";
		return Response.ok(result).build();
	}
	
}