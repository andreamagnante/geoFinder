package geoFinder.services.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.mysql.fabric.Response;

import geoFinder.model.response.GetPointResponse;
import geoFinder.model.response.RemovePointResponse;
import geoFinder.persistent.dao.PointDAO;
import geoFinder.persistent.dao.UserDAO;
import geoFinder.persistent.daoFactory.DAOFactory;
import geoFinder.persistent.entity.Point;
import geoFinder.persistent.entity.User;
import geoFinder.services.IServices;

public class ServicesImpl implements IServices{
	
	
	
	DAOFactory mysqlDAOfactory = DAOFactory.getDAOFactory(DAOFactory.MYSQL);
	
	public void registrazione(String name, String email, String password){
		
		
		UserDAO userDAO = mysqlDAOfactory.getUserDAO();
		
		User user = new User();
		user.setNome(name);
		user.setEmail(email);
		user.setPassword(password);
		userDAO.addUser(user);
		
		
	}
	
	
	public User login(String email){
		
		UserDAO userDAO = mysqlDAOfactory.getUserDAO();
			
		User user = userDAO.getUser(email);
		
		return user;
	}


	public boolean isUserExist(String email, String name) {
		
		UserDAO userDAO = mysqlDAOfactory.getUserDAO();
		
		User user = userDAO.getUser(email);
		
		if(user != null){
			
			return true;
		}
		
		User userName = userDAO.getUserName(name);
		
		if(userName != null){
			return true;
		}
		
		return false;
		
	}


	@Override
	public void savePoint(String username, String nome,  String lat, String lng, String tipo, String descrizione) {
		
		PointDAO pointDAO = mysqlDAOfactory.getPointDAO();
		
		UserDAO userDAO = mysqlDAOfactory.getUserDAO();
		
		User user = userDAO.getUserName(username);
		
		
		Point point = new Point();
		
		point.setNome(nome);
		
		point.setLat(lat);
		point.setLng(lng);
		
		point.setTipo(tipo);
		point.setDescrizione(descrizione);
		point.setUser(user);
		
		
		
		try{
			
			pointDAO.addPoint(point);			
		}catch(Exception e){
			
		}
		
		
	}


	@Override
	public GetPointResponse getPoint(String username) {
		
		
		GetPointResponse pointResponse = new GetPointResponse();
		PointDAO pointDAO = mysqlDAOfactory.getPointDAO();
		UserDAO userDAO = mysqlDAOfactory.getUserDAO();
		User user = userDAO.getUserName(username);
		
		if(user == null){
			
			pointResponse.setEsito(false);
			pointResponse.setDescrizione("UTENTE NON ESISTENTE");
			return pointResponse;
		}
		
		ArrayList<Point> pointArray = pointDAO.getPointArray(user.getId());
		
		if(pointArray == null){
			pointResponse.setEsito(false);
			pointResponse.setDescrizione("NON CI SONO PUNTI DI INTERESSE");
			
			return pointResponse;
		}
		
		
		
                pointResponse.setEsito(true);
		pointResponse.setDescrizione("PUNTI TROVATI");
		pointResponse.setPointOfInterest(pointArray);
		
	
		return pointResponse;
	}


	
	public RemovePointResponse removePoint(int idPoint) {
		
		RemovePointResponse pointResponse = new RemovePointResponse();
		PointDAO pointDAO = mysqlDAOfactory.getPointDAO();
		
		Point point = pointDAO.getPoinById(idPoint);
		
		if(point == null){
			pointResponse.setEsito(false);
			pointResponse.setDescrizione("PUNTO NON TROVATO");
		}
		if(pointDAO.removePointDAO(point)){
			pointResponse.setEsito(true);
			pointResponse.setDescrizione("PUNTO RIMOSSO CON SUCCESSO");			
		}else{
			pointResponse.setEsito(false);
			pointResponse.setDescrizione("NON E' STATO POSSIBILE RIMUOVERE IL PUNTO SELEZIONATO");	
		}
		
		
		return pointResponse;
	}
	
	
	
	
	
}