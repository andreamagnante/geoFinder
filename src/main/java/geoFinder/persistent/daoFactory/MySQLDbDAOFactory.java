package geoFinder.persistent.daoFactory;

import geoFinder.persistent.dao.PointDAO;
import geoFinder.persistent.dao.UserDAO;
import geoFinder.persistent.dao.impl.MySQLPointDAO;
import geoFinder.persistent.dao.impl.MySQLUserDAO;

public class MySQLDbDAOFactory extends DAOFactory {

	@Override
	public UserDAO getUserDAO() {	
		return new MySQLUserDAO();
	}

	@Override
	public PointDAO getPointDAO() {
		return new MySQLPointDAO();
	}
	

}
