package geoFinder.persistent.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.springframework.transaction.annotation.Transactional;

import geoFinder.persistent.dao.PointDAO;
import geoFinder.persistent.entity.Point;


public class MySQLPointDAO extends SessionFactoryHibernate implements PointDAO  {
	
	
	

	@Transactional
	public void addPoint(Point point) {
		 getSession().save(point);
	     getSession().flush(); 
	}
        
        @Override
	@Transactional
	public ArrayList<Point> getPointArray(int idUser) {
		@SuppressWarnings("unchecked")
		ArrayList<Point> listResult = ((ArrayList<Point>) getSession().createQuery("FROM Point WHERE idUser = '1' OR idUser = :idUser")
				.setParameter("idUser", idUser).list());
		if(listResult == null || listResult.isEmpty()) return null;
		return listResult;
	}


	@Override
	@Transactional
	public boolean removePointDAO(Point point) {
		String method = "removePointDAO";
		
		try{
			Query query = getSession().createQuery("DELETE FROM Point WHERE id = "+ point.getId());
			int deleted = query.executeUpdate();
			
			if(deleted == 0) return false;
		}catch(Exception e){
			
			return false;
		}
		return true;
	}

	@Override
	@Transactional
	public Point getPoinById(int id) {
		String method = "getPoinById";
		Point point = null;
		try{
			point = (Point) getSession().createQuery("FROM Point WHERE id = :id")
					.setParameter("id", id).uniqueResult();			
		}catch(Exception e){
			
			return null;
		}
		return point;
	}
	
}
