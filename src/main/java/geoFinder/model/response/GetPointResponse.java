package geoFinder.model.response;

import geoFinder.persistent.entity.Point;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class GetPointResponse extends StatusResponse {
	
	
	ArrayList<Point> pointOfInterest;
	
	String distanza;

	public ArrayList<Point> getPointOfInterest() {
		return pointOfInterest;
	}

	public void setPointOfInterest(ArrayList<Point> pointOfInterest) {
		this.pointOfInterest = pointOfInterest;
	}
	

	@Override
	public String toString() {
		return "GetPointResponse [pointOfInterest=" + pointOfInterest
				+ ", esito=" + esito
				+ ", descrizione=" + descrizione + ", getPointOfInterest()="
				+ getPointOfInterest() + ", isEsito()=" + isEsito() + ", getDescrizione()="
				+ getDescrizione() + ", toString()=" + super.toString()
				+ ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
				+ "]";
	}
	
	

}
