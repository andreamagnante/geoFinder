package geoFinder.persistent.dao.impl;


import org.springframework.transaction.annotation.Transactional;

import geoFinder.persistent.dao.UserDAO;
import geoFinder.persistent.entity.User;
import geoFinder.utils.CryptPassword;


public class MySQLUserDAO extends SessionFactoryHibernate implements UserDAO{
	
	@Transactional
	public void addUser(User user) {
		user.setPassword(CryptPassword.cryptWithMD5(user.getPassword()));
        getSession().save(user);
        getSession().flush();        	
	}

	public User getUser(String email) {
		return (User) getSession().createQuery("from User u where u.email = :email")
				.setParameter("email", email).uniqueResult();
	}
	
	public User getUserName(String nome) {
		return (User) getSession().createQuery("from User u where u.nome = :nome")
				.setParameter("nome", nome).uniqueResult();
	}
	
}
