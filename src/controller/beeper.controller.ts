import { Request, Response } from 'express';
import { Beeper } from '../models/types';
import { createBeeper, getBeepers, getBeeperByID, updateBeeperStatus, deleteBeeperByID } from "../services/beeperService.js";


export const addBeeper = async (req: Request, res: Response): Promise<void> => {
    try {
      const name: string = req.body;
  
      if (!name) {
        res.status(400).json({ error: "error" });
        return;
      }
  
      const beeper: Beeper = await createBeeper(name);
      res.status(201).json({ beeper} );
    } catch (error: any) {
      if (error.message === "Beeper already exists.") {
        res.status(400).json({ error: error.message });
      } else {
        console.error("Error", error);
        res.status(500).json({ error: "server error" });
      }
    }
};

export const getBeeperById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;

    const beeperFind = await getBeeperByID(id);
    res.status(200).json({ beeperFind: beeperFind });
  } catch (error: any) {
    if (error.message === "error") {
      res.status(400).json({ error: error.message });
    } else {
      console.error("Error", error);
      res.status(500).json({ error: "server error." });
    }
  }
};

export const geAllBeepers = async (req: Request, res: Response): Promise<void> => {
try {
    
    const beepers = await getBeepers();
    res.status(200).json(beepers);
} catch (error: any) {
    if (error.message === "error") {
    res.status(400).json({ error: error.message });
    } else {
    console.error("error:", error);
    res.status(500).json({ error: "server error" });
    }
}
};

export const updateBeeperSTatus = async (req: Request, res: Response): Promise<void> => {
try {
    const id: string = req.params.id;
    const lat = req.body.lat;
    const lon = req.body.lon;

    const updatedBeeper = await updateBeeperStatus(id, lat, lon);
    res.status(201).json({ updatedBeeper} );
} catch (error: any) {
    if (error.message === "error") {
    res.status(400).json({ error: error.message });
    } else {
    console.error("Error:", error);
    res.status(500).json({ error: "server error." });
    }
}
};

export const deleteBeeperById = async (req: Request, res: Response): Promise<void> => {
try {
    const id: string = req.params.id;

    await deleteBeeperByID(id);
    res.status(200).json({ success: "Internal server success." });
} catch (error: any) {
    if (error.message === "error") {
    res.status(400).json({ error: error.message });
    } else {
    console.error("Error", error);
    res.status(500).json({ error: "server error." });
    }
}
};