package geoFinder.persistent.dao;


import geoFinder.persistent.entity.Point;
import java.util.ArrayList;

public interface PointDAO {
	public void addPoint(Point point);
        public ArrayList<Point> getPointArray(int id);
	public boolean removePointDAO(Point point);
	public Point getPoinById(int idPoint);
}
