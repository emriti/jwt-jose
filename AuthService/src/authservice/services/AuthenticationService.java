package authservice.services;

import java.util.UUID;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/AuthenticationService")
public class AuthenticationService {

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	//@Consumes(MediaType.APPLICATION_JSON)
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_FORM_URLENCODED })
	public Response post(@FormParam("username") String username, @FormParam("password") String password) {
		String result = "{\"username\":\"" + username + "-" + password + "-" + UUID.randomUUID().toString() + "\"}";
		return Response.ok().entity(result).build();
	}
}
