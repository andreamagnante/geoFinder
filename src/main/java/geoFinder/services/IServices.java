package geoFinder.services;

import geoFinder.model.response.GetPointResponse;
import geoFinder.model.response.RemovePointResponse;
import geoFinder.persistent.entity.User;

public interface IServices {
	public void registrazione(String name, String email, String password);
	public User login(String email);
	public boolean isUserExist(String email, String name);
	public void savePoint(String username, String nome, String lat, String lng, String tipo, String descrizione);
	public GetPointResponse getPoint(String username);
	public RemovePointResponse removePoint(int idPoint);
}
