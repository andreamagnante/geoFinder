package geoFinder.controllers;

import java.util.HashMap;

import javax.validation.Valid;

import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import geoFinder.model.request.GetPointRequest;
import geoFinder.model.request.RemovePointRequest;
import geoFinder.model.request.SavePointRequest;
import geoFinder.model.response.GetPointResponse;
import geoFinder.model.response.RemovePointResponse;
import geoFinder.model.response.SavePointResponse;
import geoFinder.services.IServices;
import geoFinder.services.impl.ServicesImpl;

@RequestMapping(value = "/home")
@RestController
public class MapsController {
	
	private IServices services = new ServicesImpl();

	@RequestMapping(value = "/savePoint", method = RequestMethod.POST)
	@ResponseBody
	public SavePointResponse savePoint(@Valid @RequestBody SavePointRequest request, Errors errors){
			
		SavePointResponse response = new SavePointResponse();
		if(errors.hasErrors()){
			response.setEsito(false);
			response.setDescrizione("INPUT NON VALIDI");
			
			return response;
		}
		HashMap<String,Object> pointLocation = ((HashMap<String, Object>) request.getPointOfInterest());
		String nome = (String) pointLocation.get("nome");
		
		HashMap<String,Object> geometry = (HashMap<String, Object>) pointLocation.get("geometry");
		HashMap<String,Object> location = (HashMap<String, Object>) geometry.get("location");
		String lat = location.get("lat").toString();
		String lng = location.get("lng").toString();
		String tipo = (String) pointLocation.get("tipo");
		String descrizione = (String) pointLocation.get("descrizione");
		
		try{
			services.savePoint(request.getUsername(), nome, lat, lng, tipo, descrizione);
		}catch(Exception e){
			
			response.setEsito(false);
			response.setDescrizione("ERRORE INTERNO");
			return response;
		}
		response.setEsito(true);
		response.setDescrizione("PUNTO SALVATO CON SUCCESSO");
 		
		return response;
	}
	
	@RequestMapping(value = "/getPoint", method = RequestMethod.POST)
	@ResponseBody
	public GetPointResponse getPoint(@Valid @RequestBody GetPointRequest request, Errors errors){
		
		
		GetPointResponse response = new GetPointResponse();
		if(errors.hasErrors()){
			response.setEsito(false);
			response.setDescrizione("INPUT NON VALIDI");
			
			return response;
		}
		try{
			response = services.getPoint(request.getUsername());
		}catch(Exception e){
			
			response.setEsito(false);
			response.setDescrizione("ERRORE INTERNO");
			return response;
		}
 		
		return response;
	}
	
	
	@RequestMapping(value = "/removePoint", method = RequestMethod.POST)
	@ResponseBody
	public RemovePointResponse removePoint(@Valid @RequestBody RemovePointRequest request, Errors errors){
		
		
		
		RemovePointResponse response = new RemovePointResponse();
		if(errors.hasErrors()){
			response.setEsito(false);
			response.setDescrizione("INPUT NON VALIDI");
			return response;
		}
		try{
			response = services.removePoint(request.getIdPoint());
		}catch(Exception e){
			
			response.setEsito(false);
			response.setDescrizione("ERRORE INTERNO");
			return response;
		}
 		
		return response;
	}
}
