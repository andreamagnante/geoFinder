package geoFinder.persistent.dao;

import geoFinder.persistent.entity.User;

public interface UserDAO {
	public void addUser(User user);
	public User getUser(String email);
	public User getUserName(String nome);
}
